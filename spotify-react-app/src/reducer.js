export const initialState ={
    user: null,
    playlists: [],
    playing: false,
    item: null,
    // token: "BQCAecBw3D4V3D1y8Hjrzl9ogM1kngCSoG45uTDPV_NpNLLIuSRVYjGH9KNVtgmQZKqxw4JKbMEqZBo_nfcmFlEHD6vgWTvZ-Q8Ynt8hRpnzgCG_VlJiI05K_A3wtomUa6DVB-tq6d_cPxJMecSQlW40t9_N-OmPhA8XQBKZiw3MDPlxk7qb"
};

const reducer = ( state, action ) => {

  console.log(action);
  
  switch(action.type){

    case 'SET_USER':
        return { ...state, user: action.user };

    case 'SET_TOKEN':
        return { ...state, token: action.token };

    case 'SET_PLAYLISTS':
         return { ...state, playlists: action.playlists };

    default:  return state;  
  }
}
export default reducer;