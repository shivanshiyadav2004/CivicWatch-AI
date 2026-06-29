export default function StatCard({
  title,
  value,
  color,
  icon,
}) {
  return (
    <div
      style={{
        background: color,
        color: "white",
        padding: "25px",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0 5px 15px rgba(0,0,0,.15)",
      }}
    >
      {icon && (
        <div
          style={{
            fontSize: "40px",
            marginBottom: "15px",
          }}
        >
          {icon}
        </div>
      )}

      <h1
        style={{
          margin: 0,
          fontSize: "38px",
        }}
      >
        {value}
      </h1>

      <p
        style={{
          marginTop: "10px",
          fontWeight: "600",
        }}
      >
        {title}
      </p>
    </div>
  );
}