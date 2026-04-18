#!/bin/bash

mpc -q pause
amixer set Master mute
systemctl suspend
