<div className="left-menu col-4 col-md-3 p-4">
<Link to="/">
  <div className="color-blue">
    <h3>
      <IoIosArrowBack />
    </h3>
  </div>
</Link>
<div className="profile mt-4 profile">
  <div className="position-relative">
    {
      photoIsLoading ? (
        <div className="p-3">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )
        : (
          <>
            {detailUser.data.photo ? (
              <img
                className="profile-rounded"
                src={`https://drive.google.com/uc?export=view&id=${detailUser.data.photo}`}
                alt="Gambar Profile"
              />
            ) : (
              <img
                className="profile-rounded"
                src="https://images227.netlify.app/mernuas/default.jpg"
                alt="Gambar Profile"
              />
            )}
          </>
        )
    }
    <div
      className="edit-icon position-absolute"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#editPhoto"
    >
      <FaRegEdit />
    </div>
  </div>

  <div
    className="modal fade"
    id="editPhoto"
    tabIndex="-1"
    aria-labelledby="editPhotoLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="editPhotoLabel">
            Change Photo Profile
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <form>
            <input
              type="file"
              className="form-control"
              onChange={photoChangeHandler}
            />
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            id="close"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onSubmitPhoto}
            className="btn bg-blue text-white"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
  <h5 className="fw-bold mt-3">{detailUser.data.username}</h5>
</div>
<br />
{errors.length > 0 && (
  <div className="alert alert-danger mx-0 py-2">
    <ul className="m-0">
      {errors.map((error, index) => (
        <li key={index}>{error.msg}</li>
      ))}
    </ul>
  </div>
)}
<form onSubmit={onSubmitHandler}>
  <div className="mb-4">
    <label htmlFor="username" className="form-label">
      * Username
    </label>
    <input
      type="text"
      className="form-control"
      id="username"
      value={form.username}
      onChange={onChangeHandler}
    />
  </div>
  <div className="mb-4">
    <label htmlFor="email" className="form-label">
      * Email
    </label>
    <input
      readOnly
      type="email"
      className="form-control"
      id="email"
      value={detailUser.data.email}
    />
  </div>
  <div className="mb-4">
    <label htmlFor="phone" className="form-label">
      Phone
    </label>
    <input
      type="text"
      className="form-control"
      id="phone"
      value={form.phone}
      onChange={onChangeHandler}
    />
  </div>
  <div className="mb-4">
    <label htmlFor="bio" className="form-label">
      Bio
    </label>
    <textarea
      type="text"
      className="form-control"
      id="bio"
      rows={3}
      value={form.bio}
      onChange={onChangeHandler}
    />
  </div>
  {isLoading ? (
    <button
      className="btn bg-blue text-light p-2 w-100 mb-4"
      disabled
      type="button"
    >
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      />
      {' '}
      Loading...
    </button>
  ) : (
    <button
      className="btn bg-blue text-light p-2 w-100 mb-4"
      type="submit"
    >
      Update
    </button>
  )}
</form>
</div>