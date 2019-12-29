/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

const St = imports.gi.St;
const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const Lang = imports.lang;


let barLeft, barRight, dbusService;
function init() {
	barLeft = new St.Bin({
		style_class: "build-status-bar",
		reactive: true,
		can_focus: false,
		x_fill: true,
		y_fill: false,
		track_hover: false
	});
	barRight = new St.Bin({
		reactive: true,
		can_focus: false,
		x_fill: true,
		y_fill: false,
		track_hover: false
	});
	dbusService = new BuildProgressBar();
}

function enable() {
	barLeft.set_style("width: 0px");
	barRight.set_style("width: 100px");
	Main.panel._leftBox.insert_child_at_index(barLeft, 1);
	Main.panel._leftBox.insert_child_at_index(barRight, 2);
}

function disable() {
	Main.panel._leftBox.remove_child(barLeft);
	Main.panel._leftBox.remove_child(barRight);
}


const BuildProgressBar = new Lang.Class({
	Name: "BuildProgressBar",

	_init: function() {
		this._dbusImpl = Gio.DBusExportedObject.wrapJSObject(`
			<node>
				<interface name="com.imachug.BuildProgressBar">
					<method name="setProgress">
						<arg type="u" direction="in" />
					</method>
				</interface>
			</node>
		`, this);
		this._dbusImpl.export(Gio.DBus.session, "/com/imachug/BuildProgressBar");
	},

	setProgress(progress) {
		barLeft.set_style(`width: ${progress}px`);
		barRight.set_style(`width: ${100 - progress}px`);
	}
});