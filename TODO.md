# TODO: Fix Posts Not Visible Issue

## Completed Tasks

- [x] Analyzed the codebase to identify the issue
- [x] Modified getFeed function in postController.js to include posts from circles the user is a member of
- [x] Fixed parameter name from 'content' to 'text' in createPost function
- [x] Fixed PostCard.jsx to display post.text instead of post.content
- [x] Fixed PostCard.jsx to display post.user.username instead of post.user.name
- [x] Fixed PostCard.jsx to display comment.user.username instead of comment.user.name
- [x] Added populate for circle and comments.user in getFeed

## Next Steps

- [x] Test the application to ensure posts from circles are now visible in the feed
- [x] Verify that public posts and user's own posts are still displayed
- [x] Check for any console errors or API failures
