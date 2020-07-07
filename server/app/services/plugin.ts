import express from 'express';
import { makeControllerRoutes, ServiceManager, Config } from '@foal/core';
import { createMiddleware } from '@foal/core/lib/express/create-middleware';

import * as fs from 'fs';

/**
 *
 * @param path Folder name or path relative to app folder
 */
export function AutoloadPlugins(path?: string) {
  const expressApp = express();
  const services = new ServiceManager();

  function requirePluginsClass(dir?: string): object[] {
    const pluginDir = dir || 'plugins';
    const pluginPath = `${process.env.INIT_CWD}/build/app/${pluginDir}`;

    const modules: object[] = [];
    let pluginDirs: string[] = [];
    let moduleFile = '';

    try {
      pluginDirs = fs.readdirSync(pluginPath);
    } catch (error) {
      console.warn(`Plugins not loaded, no such directory ${pluginPath}`);
    }

    try {
      for (const plugin of pluginDirs) {
        moduleFile = `${pluginPath}/${plugin}/${plugin}.controller.js`;
        if (fs.lstatSync(moduleFile).isFile()) {
          modules.push(require(moduleFile));
        }
      }
    } catch (error) {}

    return modules;
  }

  for (const plugin of requirePluginsClass(path)) {
    const routes = makeControllerRoutes(
      '',
      [],
      plugin[Object.keys(plugin)[0]],
      services,
    );
    if (Config.get2('settings.debug')) {
      console.log(`plugin: ${Object.keys(plugin)[0]} loaded`);
    }
    for (const route of routes) {
      expressApp[route.httpMethod.toLowerCase()](
        route.path,
        createMiddleware(route, services),
      );
    }
  }

  return expressApp;
}
