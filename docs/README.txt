<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solarscapes</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<body>

    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Solarscapes</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Dashboard
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Explore</a></li>
                        </ul>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="#">About Us</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Login</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Sign Up</a></li>
                </ul>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>


    <!-- Welcome Card Section -->
    <div class="container mt-5">
        <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">Welcome to Solarscapes</h5>
                <p class="card-text">Your Gateway to the Cosmos!</p>
                <a href="#" class="btn btn-primary">Start Journey</a>
                <a href="#" class="btn btn-secondary">Learn More</a>
            </div>
        </div>
    </div>


    <!-- Explore Topics Section -->
    <div class="container mt-5">
        <div class="row">
            <div class="col-6">
                <h3 class="mb-3 text-light">Explore Topics</h3>
            </div>
            <div class="col-6 text-right">
                <a class="text-light me-4" href="#">View More Courses</a>
                <a class="btn btn-primary mb-3 mr-1" href="#carouselExampleIndicators2" role="button" data-bs-slide="prev">
                    <i class="fa fa-arrow-left"></i>
                </a>
                <a class="btn btn-primary mb-3" href="#carouselExampleIndicators2" role="button" data-bs-slide="next">
                    <i class="fa fa-arrow-right"></i>
                </a>
            </div>
            <div class="col-12">
                <div id="carouselExampleIndicators2" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <img class="img-fluid" alt="Astronomy Basics"
                                            src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                                        <div class="card-body">
                                            <h4 class="card-title">Astronomy Basics</h4>
                                            <div class="d-flex justify-content-center">
                                                <a href="#" class="btn btn-primary me-2">Start Learning</a>
                                                <a href="#" class="btn btn-light text-dark">View More Info</ </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <img class="img-fluid" alt="Space History"
                                            src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                                        <div class="card-body">
                                            <h4 class="card-title">Space History</h4>
                                            <div class="d-flex justify-content-center">
                                                <a href="#" class="btn btn-primary me-2">Start Learning</a>
                                                <a href="#" class="btn btn-light text-dark">View More Info</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <img class="img-fluid" alt="Space Exploration"
                                            src="https://images.unsplash.com/photo-1447433865958-f402f562b843?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                                        <div class="card-body">
                                            <h4 class="card-title">Space Exploration</h4>
                                            <div class="d-flex justify-content-center">
                                                <a href="#" class="btn btn-primary me-2">Start Learning</a>
                                                <a href="#" class="btn btn-light text-dark">View More Info</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <img class="img-fluid" alt="Stars and Galaxies"
                                            src="https://images.unsplash.com/photo-1513436539083-9d2127e742f1?q=80&w=2063&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                                        <div class="card-body">
                                            <h4 class="card-title">Stars and Galaxies</h4>
                                            <div class="d-flex justify-content-center">
                                                <a href="#" class="btn btn-primary me-2">Start Learning</a>
                                                <a href="#" class="btn btn-light text-dark">View More Info</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <img class="img-fluid" alt="Space Achievements"
                                            src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                                        <div class="card-body">
                                            <h4 class="card-title">Space Achievements</h4>
                                            <div class="d-flex justify-content-center">
                                                <a href="#" class="btn btn-primary me-2">Start Learning</a>
                                                <a href="#" class="btn btn-light text-dark">View More Info</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <img class="img-fluid" alt="Technology and Space"
                                            src="https://images.unsplash.com/photo-1542649761-0bdd3753c8a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8 ```html
fGVufDB8fHx8fA%3D%3D">
                                        <div class="card-body">
                                            <h4 class="card-title">Technology and Space</h4>
                                            <div class="d-flex justify-content-center">
                                                <a href="#" class="btn btn-primary me-2">Start Learning</a>
                                                <a href="#" class="btn btn-light text-dark">View More Info</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <div class="card">
                                    <img class="img-fluid" alt="Mathematics in Space"
                                        src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                                    <div class="card-body">
                                        <h4 class="card-title">Mathematics in Space</h4>
                                        <div class="d-flex justify-content-center">
                                            <a href="#" class="btn btn-primary me-2">Start Learning</a>
                                            <a href="#" class="btn btn-light text-dark">View More Info</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 mb-3">
                                <div class="card">
                                    <img class="img-fluid" alt="Famous Astronomist"
                                        src="https://images.unsplash.com/photo-1603349206295-dde20617cb6a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                                    <div class="card-body">
                                        <h4 class="card-title">Famous Astronomist</h4>
                                        <div class="d-flex justify-content-center">
                                            <a href="#" class="btn btn-primary me-2">Start Learning</a>
                                            <a href="#" class="btn btn-light text-dark">View More Info</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 mb-3">
                                <div class="card">
                                    <img class="img-fluid" alt="Constellations"
                                        src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=1826&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                                    <div class="card-body">
                                        <h4 class="card-title">Constellations</h4>
                                        <div class="d-flex justify-content-center">
                                            <a href="#" class="btn btn-primary me-2">Start Learning</a>
                                            <a href="#" class="btn btn-light text-dark">View More Info</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>

    <!-- Footer Section -->
    <footer class="bg-dark text-light text-center p-3 mt-5">
        <div class="container">
            <p>Follow us on:</p>
            <a href="#" class="text-light me-3"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="text-light me-3"><i class="fab fa-twitter"></i></a>
            <a href="#" class="text-light me-3"><i class="fab fa-instagram"></i></a>
            <a href="#" class="text-light"><i class="fab fa-linkedin-in"></i></a>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>
</body>

</html>