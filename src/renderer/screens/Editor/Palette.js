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

import React from "react";
import PropTypes from "prop-types";

import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

import { MaterialPicker } from "react-color";

import ColorBox from "./ColorBox";

const styles = theme => ({
  root: {
    display: "flex",
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
    padding: theme.spacing.unit * 2,
    justifyContent: "center"
  },
  picker: {
    margin: `0px ${theme.spacing.unit * 2}px`,
    display: "flex",
    justifyContent: "center"
  },
  pickerInner: {
    width: "130px !important"
  }
});

class Palette extends React.Component {
  onColorPick = ({ rgb: { r, g, b } }) => {
    this.props.onColorPick(this.props.selected, r, g, b);
  };

  render() {
    if (!this.props.palette) return null;

    const { classes, palette } = this.props;

    const [lowHalf, highHalf] = [palette.slice(0, 8), palette.slice(8)];
    const lowWidget = lowHalf.map((color, index) => {
      const itemKey = "palette-index-" + index.toString();
      return (
        <ColorBox
          selected={index == this.props.selected}
          key={itemKey}
          color={color}
          colorIndex={index}
          onColorSelect={this.props.onColorSelect}
        />
      );
    });
    const highWidget = highHalf.map((color, index) => {
      const itemKey = "palette-index-" + (index + 8).toString();
      return (
        <ColorBox
          selected={index + 8 == this.props.selected}
          key={itemKey}
          color={color}
          colorIndex={index + 8}
          onColorSelect={this.props.onColorSelect}
        />
      );
    });

    const color = this.props.palette[this.props.selected];

    return (
      <Paper className={classes.root} square>
        {lowWidget}
        <Fade in={this.props.selected != -1}>
          <div className={classes.picker}>
            <MaterialPicker
              className={classes.pickerInner}
              color={color}
              onChangeComplete={this.onColorPick}
            />
          </div>
        </Fade>
        {highWidget}
      </Paper>
    );
  }
}

Palette.propTypes = {
  classes: PropTypes.object.isRequired,
  palette: PropTypes.array.isRequired
};

export default withStyles(styles)(Palette);
