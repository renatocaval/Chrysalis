// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import http from "http";

let __latestVersion;

const getLatestVersion = async () => {
  if (__latestVersion) return __latestVersion;

  const extensions = {
    linux: "AppImage",
    darwin: "dmg",
    windows: "exe"
  };
  const options = {
    method: "HEAD",
    host: "kaleidoscope-builds.s3.amazonaws.com",
    port: "80",
    path: "/Chrysalis/latest/Chrysalis." + extensions[process.platform]
  };

  return new Promise(resolve => {
    const req = http.request(options, result => {
      const uri = decodeURIComponent(
        result.headers["x-amz-website-redirect-location"]
      ).split("/");
      let version = uri[uri.length - 1].split("-")[1];
      version = version.substring(
        0,
        version.length - extensions[process.platform].length - 1
      );
      resolve({
        version: version,
        url: result.headers["x-amz-website-redirect-location"]
      });
    });
    req.end();
  });
};

export { getLatestVersion as default };
