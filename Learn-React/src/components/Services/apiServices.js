import axios from "../Utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
    const form = new FormData();
    form.append('username', username)
    form.append('email', email)
    form.append('password', password)
    form.append('role', role)
    form.append('userImage', image)

    return axios.post('api/v1/participant', form)
}

export {postCreateNewUser}