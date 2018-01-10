export class API {
  private static environment = 'qa';

  public static profiles = {
    local: {
      version  : '',
      port     : '8080',
      protocol : 'http',
      host     : 'localhost',
      prefix   : 'api',
    },
    qa: {
      version  : '',
      port     : '8080',
      protocol : 'http',
      host     : '10.0.1.22',
      prefix   : 'api',
    },
  };

  static get url() {
    let api = this.profiles[this.environment];

    return api.protocol + '://' +
           api.host +
           (api.port ? ':' + api.port : '') + '/' +
           api.prefix + (api.prefix ? '/': '') +
           api.version + (api.version ? '/': '');
  }
}