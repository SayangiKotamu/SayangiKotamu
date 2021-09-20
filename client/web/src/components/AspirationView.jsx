function AspirationView(props) {
  return (
    <>
      <tbody>
        <tr>
          <th>{props.aspirasi._id}</th>
          <td>{props.aspirasi.title}</td>
          <td>{props.aspirasi.description}</td>
          <td>{props.aspirasi.type}</td>
        </tr>
      </tbody>
    </>
  );
}

export default AspirationView;
