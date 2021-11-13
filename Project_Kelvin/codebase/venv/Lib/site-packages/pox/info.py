# THIS FILE GENERATED FROM SETUP.PY
this_version = '0.3.0'
stable_version = '0.3.0'
readme = '''--------------------------------------------------------------
pox: utilities for filesystem exploration and automated builds
--------------------------------------------------------------

About Pox
=========

``pox`` provides a collection of utilities for navigating and manipulating
filesystems. This module is designed to facilitate some of the low level
operating system interactions that are useful when exploring a filesystem
on a remote host, where queries such as *"what is the root of the filesystem?"*,
*"what is the user's name?"*, and *"what login shell is preferred?"* become
essential in allowing a remote user to function as if they were logged in
locally. While ``pox`` is in the same vein of both the ``os`` and ``shutil``
builtin modules, the majority of its functionality is unique and compliments
these two modules.

``pox`` provides python equivalents of several unix shell commands such as
``which`` and ``find``. These commands allow automated discovery of what has
been installed on an operating system, and where the essential tools are
located. This capability is useful not only for exploring remote hosts,
but also locally as a helper utility for automated build and installation.

Several high-level operations on files and filesystems are also provided.
Examples of which are: finding the location of an installed python package,
determining if and where the source code resides on the filesystem, and
determining what version the installed package is.

``pox`` also provides utilities to enable the abstraction of commands sent
to a remote filesystem.  In conjunction with a registry of environment
variables and installed utilites, ``pox`` enables the user to interact with
a remote filesystem as if they were logged in locally. 

``pox`` is part of ``pathos``, a python framework for heterogeneous computing.
``pox`` is in active development, so any user feedback, bug reports, comments,
or suggestions are highly appreciated.  A list of issues is located at https://github.com/uqfoundation/pox/issues, with a legacy list maintained at https://uqfoundation.github.io/project/pathos/query.


Major Features
==============

``pox`` provides utilities for discovering the user's environment:

    - return the user's name, current shell, and path to user's home directory
    - strip duplicate entries from the user's ``$PATH``
    - lookup and expand environment variables from ``${VAR}`` to ``value``

``pox`` also provides utilities for filesystem exploration and manipulation:

    - discover the path to a file, exectuable, directory, or symbolic link 
    - discover the path to an installed package
    - parse operating system commands for remote shell invocation
    - convert text files to platform-specific formatting


Current Release
===============

This documentation is for version ``pox-0.3.0``.

The latest released version of ``pox`` is available from:

    https://pypi.org/project/pox

``pox`` is distributed under a 3-clause BSD license.

    >>> import pox
    >>> pox.license()


Development Version
===================

You can get the latest development version with all the shiny new features at:

    https://github.com/uqfoundation

If you have a new contribution, please submit a pull request.


Installation
============

``pox`` is packaged to install from source, so you can
download the tarball, unzip, and run the installer::

    [download]
    $ tar -xvzf pox-0.3.0.tar.gz
    $ cd pox-0.3.0
    $ python setup py build
    $ python setup py install

You will be warned of any missing dependencies and/or settings
after you run the "build" step above. 

Alternately, ``pox`` can be installed with ``pip`` or ``easy_install``::

    $ pip install pox


Requirements
============

``pox`` requires:

    - ``python``, **version == 2.7** or **version >= 3.6**, or ``pypy``

Optional requirements:

    - ``setuptools``, **version >= 0.6**


More Information
================

Probably the best way to get started is to look at the documentation at
http://pox.rtfd.io. Also see ``pox.tests`` for a set of scripts that demonstrate
how ``pox`` can be used to interact with the operating system. You can run the
test suite with ``python -m pox.tests``.  All ``pox`` utilities
can be launched directly from an operating system terminal, using the ``pox``
script (or with ``python -m pox``).  The source code is also generally well
documented, so further questions may be resolved by inspecting the code
itself.  Please feel free to submit a ticket on github, or ask a
question on stackoverflow (**@Mike McKerns**).
If you would like to share how you use ``pox`` in your work, please send an
email (to **mmckerns at uqfoundation dot org**).


Citation
========

If you use ``pox`` to do research that leads to publication, we ask that you
acknowledge use of ``pox`` by citing the following in your publication::

    M.M. McKerns, L. Strand, T. Sullivan, A. Fang, M.A.G. Aivazis,
    "Building a framework for predictive science", Proceedings of
    the 10th Python in Science Conference, 2011;
    http://arxiv.org/pdf/1202.1056

    Michael McKerns and Michael Aivazis,
    "pathos: a framework for heterogeneous computing", 2010- ;
    https://uqfoundation.github.io/project/pathos

Please see https://uqfoundation.github.io/project/pathos or
http://arxiv.org/pdf/1202.1056 for further information.

'''
license = '''Copyright (c) 2004-2016 California Institute of Technology.
Copyright (c) 2016-2021 The Uncertainty Quantification Foundation.
All rights reserved.

This software is available subject to the conditions and terms laid
out below. By downloading and using this software you are agreeing
to the following conditions.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met::

    - Redistribution of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.

    - Redistribution in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentations and/or other materials provided with the distribution.

    - Neither the names of the copyright holders nor the names of any of
      the contributors may be used to endorse or promote products derived
      from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

'''
