import TikAPI from 'tikapi';

const fetchUserInfo = async (accessToken) => {
  const api = TikAPI("JaDOtuymluYioUkHHJRIKqA9lkEdsPHYSK8GRYQyojaNsRZq");
  
  const User = new api.user({
    accountKey: accessToken
  });

  try {
    let response = await User.info();
    console.log(response.json);
  } catch (err) {
    console.error(err);
  }
};

export default fetchUserInfo;