export class API {
  private static environment = 'local';

  public static profiles = {
    local: {
      version  : '',
      port     : '8080',
      protocol : 'http',
      host     : 'localhost',
      prefix   : 'vid-ucab',
    },
    qa: {
      version  : '',
      port     : '8080',
      protocol : 'http',
      host     : '10.0.1.22',
      prefix   : 'vid-ucab',
    },
    eduardo: {
      version  : '',
      port     : '8080',
      protocol : 'http',
      host     : '201.208.207.67',
      prefix   : 'vid-ucab',
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