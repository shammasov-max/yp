oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
* [yp](#yp)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g yp
$ yp COMMAND
running command...
$ yp (--version)
yp/0.1.2 win32-x64 node-v16.14.2
$ yp --help [COMMAND]
USAGE
  $ yp COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`yp hello PERSON`](#yp-hello-person)
* [`yp hello world`](#yp-hello-world)
* [`yp help [COMMAND]`](#yp-help-command)
* [`yp plugins`](#yp-plugins)
* [`yp plugins:install PLUGIN...`](#yp-pluginsinstall-plugin)
* [`yp plugins:inspect PLUGIN...`](#yp-pluginsinspect-plugin)
* [`yp plugins:install PLUGIN...`](#yp-pluginsinstall-plugin-1)
* [`yp plugins:link PLUGIN`](#yp-pluginslink-plugin)
* [`yp plugins:uninstall PLUGIN...`](#yp-pluginsuninstall-plugin)
* [`yp plugins:uninstall PLUGIN...`](#yp-pluginsuninstall-plugin-1)
* [`yp plugins:uninstall PLUGIN...`](#yp-pluginsuninstall-plugin-2)
* [`yp plugins update`](#yp-plugins-update)
* [`yp scrape [URL] [OUTPUT] [LOGIN] [PASSWORD]`](#yp-scrape-url-output-login-password)

## `yp hello PERSON`

Say hello

```
USAGE
  $ yp hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/shammasov/hello-world/blob/v0.1.2/dist/commands/hello/index.ts)_

## `yp hello world`

Say hello world

```
USAGE
  $ yp hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `yp help [COMMAND]`

Display help for yp.

```
USAGE
  $ yp help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for yp.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `yp plugins`

List installed plugins.

```
USAGE
  $ yp plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ yp plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `yp plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ yp plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ yp plugins add

EXAMPLES
  $ yp plugins:install myplugin 

  $ yp plugins:install https://github.com/someuser/someplugin

  $ yp plugins:install someuser/someplugin
```

## `yp plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ yp plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ yp plugins:inspect myplugin
```

## `yp plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ yp plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ yp plugins add

EXAMPLES
  $ yp plugins:install myplugin 

  $ yp plugins:install https://github.com/someuser/someplugin

  $ yp plugins:install someuser/someplugin
```

## `yp plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ yp plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ yp plugins:link myplugin
```

## `yp plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ yp plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ yp plugins unlink
  $ yp plugins remove
```

## `yp plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ yp plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ yp plugins unlink
  $ yp plugins remove
```

## `yp plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ yp plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ yp plugins unlink
  $ yp plugins remove
```

## `yp plugins update`

Update installed plugins.

```
USAGE
  $ yp plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `yp scrape [URL] [OUTPUT] [LOGIN] [PASSWORD]`

Скачать файлы на печать из списка xls файла

```
USAGE
  $ yp scrape [URL] [OUTPUT] [LOGIN] [PASSWORD]

ARGUMENTS
  URL       Адрес страницы на сайта https://theposterdb.com/
  OUTPUT    [default: ./] Папка для размеения скаченных файлов
  LOGIN     [default: shammasov]
  PASSWORD  [default: Nq_mUmBrC8a@k4X]

DESCRIPTION
  Скачать файлы на печать из списка xls файла

EXAMPLES
  $ yp scrape https://theposterdb.com/posters/486 ./9999 Iron-Man
```

_See code: [dist/commands/scrape.ts](https://github.com/shammasov/hello-world/blob/v0.1.2/dist/commands/scrape.ts)_
<!-- commandsstop -->
# yp
