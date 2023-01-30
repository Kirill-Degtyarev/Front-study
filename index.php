<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

require_once __DIR__ . '/vendor/autoload.php';

// twig
$loader = new \Twig\Loader\FilesystemLoader(__DIR__.'/src/twig/');
$twig = new \Twig\Environment($loader, [
	'cache' => FALSE,
	'debug' => TRUE,
]);

$filter_manifest = new \Twig\TwigFilter('manifest', function ($path) {
    $manifest = json_decode(file_get_contents(__DIR__.'/dist/manifest.json'), TRUE);
	return $manifest[$path];
});

$twig->addFilter($filter_manifest);
$twig->addExtension(new \Twig\Extension\DebugExtension());

$klein = new \Klein\Klein();

$klein->respond('GET', '/', function () use ($twig) {
    return $twig->load('main.twig')->render();
});

$klein->respond('GET', '/profile', function () use ($twig) {
    return $twig->load('main.twig')->render();
});

$klein->respond('GET', '/news/[i:id]', function () use ($twig) {
    return $twig->load('main.twig')->render();
});

$klein->respond('GET', '/promotions/[i:id]', function () use ($twig) {
    return $twig->load('main.twig')->render();
});

$klein->respond('GET', '/api/news/[i:id]?', function ($request, $response, $service) {
    $send = $request->param('format', 'json');

    $json = file_get_contents(__DIR__.'/news.json');
    $data = json_decode($json, TRUE);

    if ((int)$request->id) {
        $key = array_search((int)$request->id, array_column($data, 'id'));

        if ($key === FALSE) {
            return $response->$send([]);
        }

        return $response->$send($data[$key]);
    }

    return $response->$send($data);
});

$klein->respond('GET', '/api/promotions/[i:id]?', function ($request, $response, $service) {
    $send = $request->param('format', 'json');

    $json = file_get_contents(__DIR__.'/promotions.json');
    $data = json_decode($json, TRUE);

    if ((int)$request->id) {
        $key = array_search((int)$request->id, array_column($data, 'id'));

        if ($key === FALSE) {
            return $response->$send([]);
        }

        return $response->$send($data[$key]);
    }

    return $response->$send($data);
});

$klein->dispatch();