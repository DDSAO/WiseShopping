export const SERVER_URL = "http://localhost:4020"

export const getServerUrl = (path) => { 
    if (! process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        return 'http://localhost:4006' + path
    } else {
        if (window.location.protocol !== "https:") {
            return 'http://dddsao.com/wsapi' + path
        } else {
            return 'https://dddsao.com/wsapi' + path
        } 
    }
}