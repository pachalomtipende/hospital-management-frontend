import { useEffect, useState } from "react";

function DoctorVerification() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/doctors")
            .then(res => res.json())
            .then(data => {

                setDoctors(Array.isArray(data) ? data : []);
            })
            .catch(err => {
                console.error("Failed to fetch doctors:", err);
                setDoctors([]);
            });
    }, []);

    const isPDF = (url) => url?.toLowerCase().includes(".pdf");

    if (doctors.length === 0) {
        return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading doctors...</p>;
    }


    const verifyDoctor = async (doctorId) => {
        try {
            const res = await fetch(`http://localhost:3000/doctors/${doctorId}/verify`, {
                method: "POST",
            });
            const data = await res.json();
            alert(data.message);
        } catch (error) {
            console.error("Error verifying doctor:", error);
            alert("Error verifying doctor");
        }
    };


    const rejectDoctor = async (doctorId) => {
        try {
            const res = await fetch(`http://localhost:3000/doctors/${doctorId}/reject`, {
                method: "POST",
            });
            const data = await res.json();
            alert(data.message);
        } catch (error) {
            console.error("Error rejecting doctor:", error);
            alert("Error marking doctor as not verified");
        }
    };

    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            padding: "20px",
            justifyContent: "center",
            background: "#f5f5f5",
            minHeight: "100vh"
        }}>
            {doctors.map((doctor) => (
                <div key={doctor.id} style={{
                    width: "300px",
                    background: "white",
                    borderRadius: "10px",
                    padding: "15px",
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <h2 style={{ margin: "10px 0", fontFamily: "sans-serif", color: "#1F2937" }}>
                        {doctor.full_name}
                    </h2>
                    <p style={{ margin: "5px 0", color: "#555", fontFamily: "sans-serif" }}>
                        {doctor.email}
                    </p>

                    {doctor.document_url ? (
                        isPDF(doctor.document_url) ? (
                            <iframe
                                src={doctor.document_url}
                                width="100%"
                                height="200px"
                                style={{ border: "1px solid #ddd", borderRadius: "8px", margin: "10px 0" }}
                                title="PDF Preview"
                            />
                        ) : (
                            <img
                                src={doctor.document_url}
                                alt="document"
                                style={{ width: "100%", borderRadius: "8px", margin: "10px 0" }}
                            />
                        )
                    ) : (
                        <p style={{ margin: "10px 0", color: "red" }}>No document uploaded</p>
                    )}

                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                        <button
                            onClick={() => verifyDoctor(doctor.id)}
                            style={{
                                padding: "10px 20px",
                                borderRadius: "5px",
                                border: "none",
                                background: "#22c55e",
                                color: "white",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            Verify
                        </button>

                        <button
                            onClick={() => rejectDoctor(doctor.id)}
                            style={{
                                padding: "10px 20px",
                                borderRadius: "5px",
                                border: "none",
                                background: "#ef4444",
                                color: "white",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            Not Verified
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DoctorVerification;