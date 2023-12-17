/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import {
  createLogger,
  transports as _transports,
  format as _format,
} from 'winston';
import { get } from 'node-emoji';

const logger = (createLogger({
  transports: [new _transports.Console()],
  format: _format.combine(
    _format.colorize({ all: true }),
    _format.simple(),
    _format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    _format.printf((info) => {
      let emojiToLog = '';
      if (info.level === '\x1B[32minfo\x1B[39m') {
        emojiToLog = get('white_check_mark');
      } else if (info.level === '\x1B[31merror\x1B[39m') {
        emojiToLog = get('x');
      }
      return (
        `[${info.timestamp}] ${emojiToLog} [${info.level}]: ${info.message}` +
        (info.splat !== undefined ? `${info.splat}` : ' ')
      );
    }),
  ),
}));

export default logger;
