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

const { data: { user } } = await supabase.auth.getUser() for checking user

call setSession at top level(initialization/refresh), when liking, when commenting, when uploading, and when trying to access upload page(deny user if not admin)

forgot password section, change username section, account settings page(/user/settings)

on chat attempt, create username form if !username

add birth date to sign up form?

create pages for /user/{username} and redirect to user settings if logged in(/user/{username}/settings) otherwise redirect to /login

fix error styling for long error codes(see password regex error code)

use 3rd party smtp provider for email verification and password resets. supabase limits to 4/hr. possibly use sendgrid or smtp2go.com

add 2 navbar -> settings(far right side), upload(left of settings, upload svg on mobile, possibly add to page instead), chat(left side of settings), move gallery(left side, right of music)

on mobile svgs -> music(note?), gallery(camera?), chat(chat bubble?), settings(cog)

add upload button component in gray lettering and use on top in music page and gallery page

log out component in upload page, upload page will include upload component(2 forms w/ tabs) and log out component

if user is not admin in upload page, then return log out button and "you have no access to upload"

music database: upload date, top to bottom order(index), cover art, alt text for cover art, 

in upload page: manage/delete and reorganize music, manage pins and placement for gallery page

in gallery page: click to view large photo + comments, pin to top

upload + manage button component only appears for admin sessions?

NEXT: make user settings page to update username/password(reuse auth component parts), upload button component, and logout in upload, if user !admin, logout button component shows on top of music page and gallery page

upload button on top of music and gallery, but below navbar in gray small, route to music upload form if clicked on music button but still have tab for gallery upload form

settings below upload button possibly if logged in only, also only show on user's page

redirect settings page if logged in

create way to get back to user's page easily, possibly w/ button in chat room