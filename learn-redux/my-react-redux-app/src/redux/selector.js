const userSelector = (state => state.user.listUser)
const isLoadingSelector = (state => state.user.isLoading)
const isErrorSelector = (state => state.user.isError)
const isCreatingSelector = (state => state.user.isCreating)
const isDeleteSelector = (state => state.user.isDelete)


export {
    userSelector, isLoadingSelector,
    isErrorSelector, isCreatingSelector, isDeleteSelector
}