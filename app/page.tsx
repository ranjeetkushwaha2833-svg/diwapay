
export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background: "#f7f3ff",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ color: "#7027a5" }}>DiwaPAY</h1>
      <p>Welcome to DiwaPAY</p>
      <form style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
        maxWidth: "300px"
      }}
      onSubmit={(e) => {
        e.preventDefault();
        alert("Login page is working!");
      }}>
        <input
          type="tel"
          placeholder="Enter your mobile number"
          required
          style={{ padding: "14px" }}
        />
        <input
          type="password"
          placeholder="Enter password"
          required
          style={{ padding: "14px" }}
        />
        <button
          type="submit"
          style={{
            padding: "14px",
            background: "#7027a5",
            color: "white",
            border: "none",
            borderRadius: "8px"
          }}>
          Login
        </button>
      </form>
    </main>
  );
}
