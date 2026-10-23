export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#f7f3ff",
      fontFamily: "Arial, sans-serif",
      padding: "24px"
    }}>
      <h1 style={{ color: "#7027a5" }}>DiwaPAY</h1>
      <p>Welcome to DiwaPAY</p>
      <input
        placeholder="Enter your mobile number"
        style={{ padding: "14px", margin: "8px", width: "250px" }}
      />
      <input
        placeholder="Enter password"
        type="password"
        style={{ padding: "14px", margin: "8px", width: "250px" }}
      />
      <button style={{
        padding: "14px 40px",
        background: "#7027a5",
        color: "white",
        border: "none",
        borderRadius: "8px"
      }}>
        Login
      </button>
    </main>
  );
}
