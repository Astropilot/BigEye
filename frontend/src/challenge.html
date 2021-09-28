<?php

require_once '../app/autoload.php';

use BigEye\ChallengeManager;

session_start();

ChallengeManager::getInstance()->banGuard();

ChallengeManager::getInstance()->loadCurrentChallenge();

$now = new \DateTime();

// Hint management
if (isset($_POST['hint']) && $_POST['hint'] === 'ask') {
    $hint_time = ChallengeManager::getInstance()->getHintUnlockTime();

    if ($now < $hint_time) {
        http_response_code(403);
    } else {
        echo $challenge->hint;
    }
    exit();
}

// Flag management
if (isset($_POST['flag'])) {
    $flag = $_POST['flag'];

    if ($flag === $challenge->flag) {
        ChallengeManager::getInstance()->nextStep();
    } else {
        http_response_code(403);
    }
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
    <link rel="stylesheet" href="css/challenge.css" />

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
    <script src="vendors/particlesjs/particles.min.js"></script>
  </head>

  <body>
    <div id="particles-js"></div>
    <div class="container-fluid d-flex h-100">
        <div class="row my-auto w-100">
        <div class="col-8 offset-2">
                <div class="card text-center">
                    <div class="card-header">
                        <div class="row justify-content-between align-items-center">
                            <div class="ml-2 text-mono">Category: <?php echo $challenge->type; ?></div>
                            <h3 class="text-mono m-0"><?php echo $challenge->title; ?></h3>
                            <div class="mr-2">
                                <span class="difficulte difficulte1 <?php if ($challenge->difficulty === 'Very Easy') echo 'difficulte1a';  ?>" data-toggle="tooltip" data-placement="top" title="" data-original-title="Difficulty: Very Easy"></span>
                                <span class="difficulte difficulte2 <?php if ($challenge->difficulty === 'Easy') echo 'difficulte2a';  ?>" data-toggle="tooltip" data-placement="top" title="" data-original-title="Difficulty: Easy"></span>
                                <span class="difficulte difficulte3 <?php if ($challenge->difficulty === 'Medium') echo 'difficulte3a';  ?>" data-toggle="tooltip" data-placement="top" title="" data-original-title="Difficulty: Medium"></span>
                                <span class="difficulte difficulte4 <?php if ($challenge->difficulty === 'Hard') echo 'difficulte4a';  ?>" data-toggle="tooltip" data-placement="top" title="" data-original-title="Difficulty: Hard"></span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <?php ChallengeManager::getInstance()->displayCurrentChallenge(); ?>

                        <hr>
                        <div class="row mb-2">
                            <div class="col-12">
                                <form class="form-inline justify-content-center needs-validation" id="answerForm" novalidate>
                                    <input type="text" class="form-control" id="answerInput" minlength="19" maxlength="19" required placeholder="Flag: XXXX-XXXX-XXXX-XXXX">
                                    <button type="button" class="btn btn-shadow btn-success" id="answerBtn">Submit the flag</button>
                                </form>
                            </div>
                        </div>
                        <span id="invalidAnswserInput" class="text-center text-mono text-danger" style="display: none;">Please provide a valid flag.</span>
                        <span id="errorAnswser" class="text-center text-mono text-danger" style="display: none;">The flag given is not the right one!</span>
                        <span id="correctAnswser" class="text-center text-mono text-success" style="display: none;">Congratulations on finding the flag! You will be redirected to the next challenge...</span>
                    </div>
                    <div class="card-footer text-muted p-1 text-mono">
                        <strong><i class="far fa-lightbulb mr-2"></i>Need a hint?</strong>
                        <span id="hint-wait">
                            You will be able to access a hint about this challenge in <span id="hint-time"></span>
                        </span>
                        <span id="hint-available" style="display: none;">
                            <a href="#" id="ask-hint">Ask for a hint now!</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="hintModal" tabindex="-1" aria-labelledby="hintModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-mono" id="hintModalLabel"><i class="far fa-lightbulb mr-1"></i> Hint</h5>
            </div>
            <div class="modal-body text-mono text-success text-center">
                Hint: <span id="hint"></span>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-shadow text-mono btn-outline-danger text-mono" data-dismiss="modal"><i class="fas fa-times mr-2"></i>Close</button>
        </div>
      </div>
    </div>

    <script>

        particlesJS.load('particles-js', '/vendors/particlesjs/particlesjs.json');

        $(function () {
            $('[data-toggle="tooltip"]').tooltip();

            function displayAskForHint() {
                $('#hint-wait').hide();
                $('#hint-available').show();
            }

            const date_hint = new Date(<?php echo ChallengeManager::getInstance()->getHintUnlockTime()->getTimestamp() ?> * 1000);
            const now = new Date();

            if (now < date_hint) {
                const counterId = countdown(
                    date_hint,
                    function(ts) {
                        if (ts.value >= 0) {
                            window.clearInterval(counterId);
                            displayAskForHint();
                        }
                        document.getElementById('hint-time').innerHTML = ts.toString();
                    },
                    countdown.MINUTES | countdown.SECONDS
                );
            } else {
                displayAskForHint();
            }



            $('#ask-hint').on('click', function() {
                $.post('/challenge.php', {hint: 'ask'}, function (response) {
                    $('#hint').text(response);
                    $('#hintModal').modal('show');
                });
            });

            $('#answerBtn').on('click', function() {
                const flag = $('#answerInput').val();

                if (!$('#answerInput')[0].checkValidity()) {
                    $('#answerInput').addClass('is-invalid');
                    $('#invalidAnswserInput').show();
                    return;
                }

                $('#answerInput').removeClass('is-invalid');
                $('#invalidAnswserInput').hide();

                $.post('/challenge.php', {flag: flag}, function () {
                    $('#correctAnswser').show();
                    setTimeout(function() {
                        window.location.replace("/challenge.php");
                    }, 3000);
                }).fail(function() {
                    $('#errorAnswser').show();
                    setTimeout(function() {
                        $('#errorAnswser').hide();
                    }, 3000);
                });
            });
        });
    </script>
  </body>
</html>
