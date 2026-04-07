param(
    [switch]$Quick,
    [switch]$Memory,
    [switch]$Dev,
    [switch]$Debug
)

$ErrorActionPreference = 'Stop'

$ScriptPath = if ($PSCommandPath) { $PSCommandPath } elseif ($MyInvocation.MyCommand.Path) { $MyInvocation.MyCommand.Path } else { $null }
if (-not $ScriptPath) {
    throw 'Could not resolve start.ps1 path.'
}

$ProjectRoot = Split-Path -Parent $ScriptPath
$Launcher = Join-Path $ProjectRoot 'scripts/start-windows.ps1'

if (-not (Test-Path $Launcher)) {
    throw "Windows launcher not found: $Launcher"
}

$args = @()
if ($Quick) { $args += '-Quick' }
if ($Memory) { $args += '-Memory' }
if ($Dev) { $args += '-Dev' }
if ($Debug) { $args += '-Debug' }

Set-Location $ProjectRoot
& powershell.exe -NoProfile -ExecutionPolicy Bypass -File $Launcher @args
exit $LASTEXITCODE
