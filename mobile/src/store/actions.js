// uma ação chama o action através do dispath.
// Agora esta action recebe um commit que chama alguma mutation. Recebe tbm ym payload que pode ser extraído.
export function ACTION_GITHUB_USERNAME ({commit}, github_username) {
    // console.log("ACTION",github_username)
    commit('MUTATION_GITHUB_USERNAME', github_username);
}