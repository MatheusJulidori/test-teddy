export const useAuth = () => {
    const username = localStorage.getItem('username');
    return { username, isLoggedIn: !!username }
}