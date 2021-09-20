function Category(props) {
  return (
    <>
      <div>
        <button
          className="btn btn-block mb-3"
          style={{ backgroundColor: "#05DAA7" }}
        >
          {props.category.name}
        </button>
      </div>
    </>
  );
}

export default Category;
