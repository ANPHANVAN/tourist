async function fetchUserData(userId) {
    if (!userId) {
        const response = await fetch(`/api/user/all-user`)
        const { users } = await response.json();
        return users;
    } else {
        const response = await fetch(`/api/users/${userId}`)
        const { user } = await response.json();
        return user;
    }
}
    
document.addEventListener('DOMContentLoaded', async () => {
    const respose = await fetch('/api/user-current')
    const { user } = await respose.json()
    const profileUser = document.querySelector('#profile-user')
    profileUser.innerHTML = `${user.fullname || "Profile"}`
})
