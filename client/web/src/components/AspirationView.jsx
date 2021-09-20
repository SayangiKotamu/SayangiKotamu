function AspirationView(props) {
  return (
    <>
      <tbody>
        <tr>
          <th>{props.aspirasi.id}</th>
          <td>{props.aspirasi.user.full_name}</td>
          <td>{props.aspirasi.dinas.name}</td>
          <td>{props.aspirasi.description}</td>
          <td>{props.aspirasi.type}</td>
        </tr>
      </tbody>
    </>
  );
}

export default AspirationView;
