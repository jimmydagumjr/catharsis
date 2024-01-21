# to do
1. photobook
    -flask & python maybe to extract image data
    -store data into sql
    -query and retrieve to show back on frontend
    -all photos should by hyperlinked(currently do not have the funds to buy any bucket... [currently broke])
    -implement better image loading technique and automate images

create minimized reducer & state for music player

SET MINIMIZED TO FALSE WHEN CLICKING ON PLAYLIST ITEM

ADD CIRCLE AND BLUR FILTER AROUND SVG

add logo flip to line when scrolling down

use login page as redirect when trying to upload, also use as redirect when trying to add like or comment after functionality implemented

remove admin page

upload page should only be accessible to my uid jwt token

create search component for music playlist and gallery

create filter component for gallery

maybe add a realtime chat for each user profile if scaled

settings page for change password, email, username

in settings page, use popups for changing and reuse auth; make sure to have popup for log in first

on register page, redirect to home page if session exists; user must log out first

like button and like count to the right of spotify button on music page

add loading icons to playlist and gallery when fetching asynchronously from database

add a section in settings to connect github to user account if github not connected yet in current user's account

for the upload forms, disable component/button clicks when uploading state is true
possibly do the same for auth forms^

if no user session from redux store present, and user clicks on either upload, like, or attempts to comment, or live chat functionality in the future(?) and sends a live chat, then send to login page

on register submit, return to user saying to check email

user slice for redux store; on confirm email and redirect, update user slice again

const { data: { user } } = await supabase.auth.getUser() for checking user

if user is null redirect to login, if user is not authenticated, return (user not authenticated, check email for verification)

call setSession at top level(initialization/refresh), when liking, when commenting, when uploading, and when trying to access upload page(deny user if not admin)

forgot password section, change username section, account settings page(/user/settings)

on github redirect, create username form if !username

add birth date to sign up form?

create pages for /user/{username} and redirect to user settings if logged in(/user/{username}/settings) otherwise redirect to /login

fix error styling for long error codes(see password regex error code)

verify your email styling

use 3rd party smtp provider for email verification and password resets. supabase limits to 4/hr. possibly use sendgrid or smtp2go.com

add 2 navbar -> settings(far right side), upload(left of settings, upload svg on mobile, possibly add to page instead), chat(left side of settings), move gallery(left side, right of music)

on mobile svgs -> music(note?), gallery(camera?), chat(chat bubble?), settings(cog)

NEXT: finish forget password; finish change username