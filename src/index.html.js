const PROFILE_API = {
  development: '',
  beta: '',
  production: 'https://merchant.shangfudata.com/api'
};

module.exports = function ({htmlWebpackPlugin}) {
  const {debug, env} = htmlWebpackPlugin.options;
  const {PROFILE = 'development'} = env;

  const api = debug ? `http://' + location.hostname + ':' + location.port + '/api` : PROFILE_API[PROFILE];

  return `
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
  <title>webApp</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <script>
    window.config = {
      api: '${api}'
    };
  </script>
</head>
<body>
<noscript>
  您的浏览器需要启用JavaScript才能访问该网页.<br/>
  You need to enable JavaScript to this app.
</noscript>
<div id="application">正在加载...</div>
</body>
</html>
`;
};
