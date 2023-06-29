import { log, getFutureStream } from './streamify.utils';
const moduleOptions = `<%= JSON.stringify(options) %>`;

export default function(app, inject) {
  const options = JSON.parse(moduleOptions);
  // This will make all your module options available through your modules name, for example `this.$ralphModule` in all your components  
  const obj = {
    options: options,
    log: log,
    getFutureStream: getFutureStream
  };
  inject(options.name, obj);
}
