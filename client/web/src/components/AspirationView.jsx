function AspirationView(props) {
  return (
    <>
      <tbody>
        <tr>
          <td
            style={{
              color: "black",
              borderBottomColor: "black",
              borderWidth: 1,
              borderColor: "#b4b4b4",
              padding: 5,
            }}
            className="text-center"
          >
            {props.aspirasi.title}
          </td>
          <td
            style={{
              color: "black",
              borderBottomColor: "black",
              borderWidth: 1,
              borderColor: "#b4b4b4",
              padding: 5,
            }}
            className="text-center"
          >
            {props.aspirasi.description}
          </td>
          <td
            style={{
              color: "black",
              borderBottomColor: "black",
              borderWidth: 1,
              borderColor: "#b4b4b4",
              padding: 5,
            }}
            className="text-center"
          >
            {props.aspirasi.type}
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default AspirationView;
