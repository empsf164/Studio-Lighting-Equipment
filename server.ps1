$port = 8899
$endpoint = New-Object System.Net.IPEndPoint([System.Net.IPAddress]::Loopback, $port)
$tcpListener = New-Object System.Net.Sockets.TcpListener($endpoint)
$tcpListener.Start()
Write-Host "Lumora Studio web server running at http://127.0.0.1:$port/"

$currentDir = (Get-Location).Path

while ($true) {
    try {
        $client = $tcpListener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
        
        $requestLine = $reader.ReadLine()
        if ([string]::IsNullOrWhiteSpace($requestLine)) {
            $client.Close()
            continue
        }
        
        # Read headers until empty line
        while (($line = $reader.ReadLine()) -and $line.Length -gt 0) {}
        
        $tokens = $requestLine.Split(" ")
        if ($tokens.Length -lt 2) {
            $client.Close()
            continue
        }
        
        $rawPath = $tokens[1]
        $cleanPath = $rawPath.Split("?")[0].TrimStart('/')
        if ([string]::IsNullOrEmpty($cleanPath)) {
            $cleanPath = "index.html"
        }
        
        $filePath = Join-Path $currentDir $cleanPath
        
        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".svg"  { "image/svg+xml" }
                default { "application/octet-stream" }
            }
            
            $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
            $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($fileBytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
            
            $stream.Write($headerBytes, 0, $headerBytes.Length)
            $stream.Write($fileBytes, 0, $fileBytes.Length)
        } else {
            $errBody = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: $($errBody.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
            
            $stream.Write($headerBytes, 0, $headerBytes.Length)
            $stream.Write($errBody, 0, $errBody.Length)
        }
        
        $stream.Flush()
        $client.Close()
    } catch {
        # continue
    }
}
