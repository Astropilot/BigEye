<?php
session_start();

if (isset($_POST['giveup'])) {
    $_SESSION['giveup_expiration'] = new DateTime();
    $_SESSION['giveup_expiration']->modify('+2 minutes');
    echo 'OK';
    exit();
}

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
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
                <a href="#" class="btn btn-shadow btn-success mr-4">
                  <i class="fas fa-check mr-2"></i>
                  Let's begin!</a>
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
            <h1>Shame on you!</h1>
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

    <script>

        <?php
            $now = new DateTime();
            if (isset($_SESSION['giveup_expiration']) && $now < $_SESSION['giveup_expiration']) {
        ?>
        $('#shameModal').modal();
        <?php
            }
        ?>

        $('#giveupBtn').on('click', function () {
            $.post('/index.php', {giveup: 'yes'}, function (response) {
                if (response === 'OK') {
                    $('#shameModal').modal();
                }
            });
        });
    </script>
  </body>
</html>
