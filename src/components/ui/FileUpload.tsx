import { useRef, useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap"
import { apiRequest } from "../../services/api";
import { DEMOGRAPICS_FIELDS, UPLOAD_FILE_END_POINT } from "../../constants";

type Props = {
    refreshCards: () => void;
}

const FileUpload = ({refreshCards}: Props) => {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [alert, setAlert] = useState<{
        type: "success" | "danger";
        message: string;
        } | null>(null);
    const [show, setShow] = useState<boolean>(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        if (!selectedFile) return;

        if (!selectedFile.name.endsWith(".csv")) {
            setAlert({
                type: "danger",
                message: "Only CSV files are allowed"
            })
            return;
        }

        setFile(selectedFile);
        console.log(e.target.files?.[0].name)
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        console.log("In handleSubmit")
        e.preventDefault();

        if (!file) {
            setAlert({
                type: "danger",
                message: "Please select a file"
            })
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const data = await apiRequest(UPLOAD_FILE_END_POINT, {
                method: "POST",
                body: formData,});
            setAlert({
                type: "success",
                message: data?.message || "Upload successful"
            })
            refreshCards(); // refresh dashboard
        } catch (err: any) {
            setAlert({
                type: "danger",
                message: err.message
            })
        }
    };

    const alertUI = alert && (
                        <Alert
                            variant={alert.type}
                            onClose={() => setAlert(null)}
                            dismissible
                        >
                            {alert.message}
                        </Alert>
                        )
    
    const note = show && (
                    <Alert
                            variant={"primary"}
                            onClose={() => setShow(false)}
                            dismissible
                        >
                            {"Note: The backend services hosted on Render takes 1-2mins to get started (Thanks to Free tier!)"}
                            {" So, Thank you for your patience in advance! :)"}
                    </Alert>
                )

    return (
        <div>
            {note}
            {alertUI}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFileLg" className="mb-3" >
                    <Form.Label><b>Upload CSV File</b> <br></br>
                        <i>(<b>Fields:</b> {DEMOGRAPICS_FIELDS.join(", ")})</i>
                    </Form.Label>
                    <Row>
                        <Col md={10}>  
                            <Form.Control type="file" size="lg" accept=".csv" 
                                    onChange={handleChange}
                                    ref={fileInputRef}   
                            /> 
                        </Col>
                        <Col md={2} >
                            <Button variant="dark" type="submit">Upload</Button>
                        </Col>

                    </Row>
                    
                </Form.Group>
        </Form>
        </div>
        
        
    )
}

export default FileUpload
