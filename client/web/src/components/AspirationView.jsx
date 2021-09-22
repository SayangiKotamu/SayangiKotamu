function AspirationView(props) {
  return (
    <>
      <tbody>
        <tr>
          <td style={{ color: "black", borderColor: 'black' }}>{props.aspirasi.title}</td>
          <td style={{ color: "black", borderBottomColor: 'black' }}>{props.aspirasi.description}</td>
          <td style={{ color: "black", borderColor: 'black' }}>{props.aspirasi.type}</td>
        </tr>
        <hr />
      </tbody>
    </>
  );
}

export default AspirationView;
