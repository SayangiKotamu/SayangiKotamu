function AspirationView(props) {
  return (
    <>
      <tbody>
        <tr>
          <td style={{ color: "#f15447" }}>{props.aspirasi.title}</td>
          <td style={{ color: "#f15447" }}>{props.aspirasi.description}</td>
          <td style={{ color: "#f15447" }}>{props.aspirasi.type}</td>
        </tr>
      </tbody>
    </>
  );
}

export default AspirationView;
