import moment from "moment";

function PostCard({ post, onLike, onComment }) {
  return (
    <div className="card mb-4 p-3">

      <div className="d-flex justify-content-between">
        <strong>{post.user?.username}</strong>
        <small className="text-muted">
          {moment(post.createdAt).fromNow()}
        </small>
      </div>

      {post.circle && (
        <span className="badge bg-secondary my-1">
          🔒 {post.circle.name}
        </span>
      )}

      <p>{post.text}</p>

      <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => onLike(post._id)}
      >
        ❤️ {post.likes.length}
      </button>

      <div className="mt-3">
        {post.comments.map((c) => (
          <div key={c._id}>
            <strong>{c.user?.username}</strong>: {c.text}
          </div>
        ))}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onComment(post._id, e.target.comment.value);
            e.target.reset();
          }}
        >
          <input
            name="comment"
            className="form-control mt-2"
            placeholder="Write a comment..."
          />
        </form>
      </div>
    </div>
  );
}

export default PostCard;
