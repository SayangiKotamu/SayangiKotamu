function AspirationView(props) {
  return (
    <>
      <tbody>
        <tr>
          <td style={{ color: "black", borderBottomColor: 'black', borderWidth: 1, borderColor: '#b4b4b4' }}>{props.aspirasi.title}</td>
          <td style={{ color: "black", borderBottomColor: 'black', borderWidth: 1, borderColor: '#b4b4b4' }}>{props.aspirasi.description}</td>
          <td style={{ color: "black", borderBottomColor: 'black', borderWidth: 1, borderColor: '#b4b4b4' }}>{props.aspirasi.type}</td>
        </tr>
      </tbody>
    </>
  );
}

export default AspirationView;
