<?php

require_once '../app/autoload.php';

use BigEye\ChallengeManager;

session_start();

if (isset($_POST['giveup'])) {
    $ban_expiration = ChallengeManager::getInstance()->banUser();
    echo $ban_expiration->getTimestamp();
    exit();
}

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>Big Eye - Security Challenge</title>

    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
      integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="vendors/neon-glow/css/bootstrap4-neon-glow.min.css" />
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
    <link rel="stylesheet" href="//cdn.jsdelivr.net/font-hack/2.020/css/hack.min.css" />
    <link rel="stylesheet" href="css/global.css" />
  </head>

  <body>
    <div class="container d-flex h-100">
      <div class="row my-auto">
        <div class="col-md-6 offset-md-3 text-center">
          <h1 class="display-2 glitch" data-text="Big Eye">Big Eye</h1>
          <div class="lead mb-3 text-mono text-success">We watch and control..<span class="vim-caret">.</span></div>

          <div class="card mb-3 text-center bg-dark text-white">
            <div class="card-body">
              <p class="mb-0">We are a powerful but careful organization.
                Would you like to join us? Then prove your worth by getting around the security
                systems we have in place. Wealth, power and glory await you at the end of this labyrinth.</p>
            </div>
            <div class="card-footer">
              <div class="text-mono">
                <button type="button" class="btn btn-shadow btn-success mr-4" data-toggle="modal" data-target="#rulesModal">
                  <i class="fas fa-check mr-2"></i>
                  Let's begin!</button>
                <button type="button" class="btn btn-shadow btn-outline-danger" id="giveupBtn">
                  <i class="fas fa-times mr-2"></i>
                  I give up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="shameModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="shameModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-body text-mono text-success text-center">
            <h2>Shame on you! As a penalty for your cowardly act you are banned from the site for 2 minutes.</h2>
            <h3>You will be free in <span id="ban-countdown"></span></h3>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="rulesModal" tabindex="-1" aria-labelledby="rulesModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="rulesModalLabel">Rules</h5>
            </div>
            <div class="modal-body text-mono text-success text-center">
                <h5>Here are the rules of this challenge that you must respect:</h5>
                <div class="row">
                    <div class="col-10 offset-1 text-center">
                        <ul class="list-group">
                        <li class="list-group-item list-group-item-danger list-group-item-action">
                            <i class="fas fa-times-circle"></i>
                            It is forbidden to use site analysis/bruteforce systems, you do not need them to solve this challenge
                        </li>
                        <li class="list-group-item list-group-item-danger list-group-item-action">
                            <i class="fas fa-times-circle"></i>
                            Sharing solutions for this challenge is prohibited and should not be posted on the internet
                        </li>
                        <li class="list-group-item list-group-item-warning list-group-item-action">
                            <i class="fas fa-exclamation-triangle"></i>
                            The hints will be available only 5min after the launch of a stage, do not try to get them before by devious means
                        </li>
                        <li class="list-group-item list-group-item-info list-group-item-action">
                            <i class="fas fa-info-circle"></i>
                            Keep the challenge keys somewhere because if your session expires you will go back to step 1
                        </li>
                        <li class="list-group-item list-group-item-success list-group-item-action">
                            Good luck!
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
            <a href="challenge.php" class="btn btn-success mr-4">
                  <i class="fas fa-check mr-2"></i>
                  I accept the rules</a>
            </div>
        </div>
      </div>
    </div>

    <script
      src="https://code.jquery.com/jquery-3.3.1.min.js"
      integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
      integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
      crossorigin="anonymous"
    ></script>
    <script src="vendors/countdown/countdown.min.js"></script>

    <script>

        function showBanModal(ban_timestamp) {
            const counterId = countdown(
                new Date(ban_timestamp * 1000),
                function(ts) {
                    if (ts.value >= 0) {
                        $('#shameModal').modal('hide');
                        window.clearInterval(counterId);
                    }
                    document.getElementById('ban-countdown').innerHTML = ts.toString();
                },
                countdown.MINUTES | countdown.SECONDS
            );
            $('#shameModal').modal();
        }

        <?php
            $ban_expiration = ChallengeManager::getInstance()->getBanExpirationDate();
            if ($ban_expiration !== null) {
        ?>
                showBanModal(<?php echo $ban_expiration->getTimestamp() ?>);
        <?php
            }
        ?>

        $('#giveupBtn').on('click', function () {
            $.post('/index.php', {giveup: 'yes'}, function (response) {
                showBanModal(parseInt(response, 10));
            });
        });
    </script>
  </body>
</html>
