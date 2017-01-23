"use strict";

$(document).ready(function () {
  let session_length = parseInt($('.session-length').text()) * 60;
  let break_length = parseInt($('.break-length').text()) * 60;
  let status = 'stop'; // [session, break, stop]

  // break-minus
  $('.break-minus').click(function () {
    if (status === 'stop') {
      if (break_length > 60) {
        break_length -= 60;
        $('.break-length').text(break_length / 60);
      }
    }

  });

  // break-add
  $('.break-add').click(function () {
    if (status === 'stop') {
      if (break_length < 30 * 60) {
        break_length += 60;
        $('.break-length').text(break_length / 60);
      }
    }

  });

  // session-minus
  $('.session-minus').click(function () {
    if (status === 'stop') {
      if (session_length > 5 * 60) {
        session_length -= 5 * 60;
      } else if (session_length > 60) {
        session_length -= 60;
      }

      $('.session-length').text(session_length / 60);
      $('.timer').text(session_length / 60 + ":00")
    }

  });

  // session-add
  $('.session-add').click(function () {
    if (status === 'stop') {
      if (session_length >= 5 * 60) {
        session_length += 5 * 60;
      } else if (session_length < 5 * 60) {
        session_length += 60;
      }

      $('.session-length').text(session_length / 60);
      $('.timer').text(session_length / 60 + ":00")
    }

  });

  // begin
  $('.begin').click(function () {
    // session
    status = 'session';
    $('.timer').addClass('timer-session');
    let timeinterval = setInterval(function () {
      if (status === 'session') {
        session_length -= 1;
        console.log(session_length);
        let minute = Math.floor(session_length / 60);
        let sec = session_length % 60;
        let second = sec;
        if (sec < 10) {
          second = '0' + sec;
        }
        $('.timer').text(minute + ':' + second);

        if (session_length <= 0) {
          status = 'break';
          session_length = parseInt($('.session-length').text()) * 60;

          $('.timer').removeClass('timer-session');
          $('.timer').addClass('timer-break');
        }
      }

    }, 1000);


    // break
    let n = 0;

    setInterval(function () {
      if (status === 'break') {
        ++n;
        let minute = Math.floor(n / 60);
        let sec = n % 60;
        let second = sec;
        if (sec < 10) {
          second = '0' + sec;
        }
        $('.timer').text(minute + ':' + second);

        if (n > break_length) {
          status = 'session';
          n = 0;

          $('.timer').removeClass('timer-break');
          $('.timer').addClass('timer-session');
        }
      }
    }, 1000);
  });

  // reset
  $('.reset').click(function () {
    status = 'stop';
    $('.break-length').text('5');
    $('.session-length').text('25');
    $('.timer').text('25:00');
    session_length = parseInt($('.session-length').text()) * 60;
    break_length = parseInt($('.break-length').text()) * 60;

    $('.timer').removeClass('timer-session');
    $('.timer').removeClass('timer-break');
  });
});
