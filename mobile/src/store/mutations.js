// Mutation pode mutar um state atraves do paramentro que recebe.
// recebe um payload.
export function MUTATION_GITHUB_USERNAME (state, github_username) {
    // console.log("MUTATION",github_username)
    state.github_username = github_username;
}