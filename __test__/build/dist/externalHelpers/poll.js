/**
* ------------------------------------------
* Rollup vue to nej
* @version  1.2.9
* @path  __test__/build/dist/externalHelpers/poll.js
* 
* You need to check the changes after packing
* ------------------------------------------
*/
NEJ.define(function () {

  /**
   * 轮询方法，支持同步和异步
   *
   * 使用前请确保页面引用了：
   * https://edu-cms.nosdn.127.net/topics/js/babel-runtime_ffc44794dcf003f884441044fd0d548e.js
   * 脚本举例
   * ```
   *   const { poller, cancel } = poll({
   *     fn: getUser,
   *     validate: v => v.result === true,
   *     interval: 1000,
   *     maxAttempts: 20
   *   });
   *   //手动取消轮询
   *   setTimeout(() => cancel(), 7000);
   *   //满足validate后的fn后续回调
   *   poller.then(data => {
   *     console.log('poller done')
   *     console.log(data);
   *   });
   * ```
   *
   * @param fn - 轮询函数
   * @param validate - 验证函数，true则返回resolve
   * @param interval - 间隔时间，默认1000毫秒
   * @param maxAttempts - 最大尝试次数，默认10次
   * @returns 轮询对象，提供轮询Promise和cancel取消轮询方法
   */
  function poll(_ref) {
    var fn = _ref.fn,
        validate = _ref.validate,
        _ref$interval = _ref.interval,
        interval = _ref$interval === void 0 ? 1000 : _ref$interval,
        _ref$maxAttempts = _ref.maxAttempts,
        maxAttempts = _ref$maxAttempts === void 0 ? 10 : _ref$maxAttempts;
    var attempts = 0;
    var canceled = false;

    var cancel = function cancel() {
      canceled = true;
    };

    var executePoll = function executePoll(resolve, reject) {
      var result;
      return regeneratorRuntime.async(function executePoll$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!canceled) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(fn());

            case 4:
              result = _context.sent;
              attempts++;

              if (!validate(result)) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", resolve(result));

            case 10:
              if (!(maxAttempts && attempts === maxAttempts)) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return");

            case 14:
              setTimeout(executePoll, interval, resolve, reject);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      });
    };

    return {
      poller: new Promise(executePoll),
      cancel: cancel
    };
  }

  var poll$1 = {
    poll: poll
  };

  return poll$1;

});
