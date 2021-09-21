function AspirationView(props) {
  return (
    <>
      <tbody>
        <tr>
          <td style={{ color: "black" }}>{props.aspirasi.title}</td>
          <td style={{ color: "black" }}>{props.aspirasi.description}</td>
          <td style={{ color: "black" }}>{props.aspirasi.type}</td>
        </tr>
        <hr />
      </tbody>
    </>
  );
}

export default AspirationView;
