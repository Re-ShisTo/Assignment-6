import { logOut } from "../firebaseConfig";

const Home = () => {
  return (
    <div className="home">
      <h1>Congratulations! you have succesfully logged in</h1>
      <button className="log-out-btn" onClick={() => logOut()}>
        Log out
      </button>
    </div>
  );
};

export default Home;
