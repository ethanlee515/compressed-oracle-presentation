# Plans for the slides

### Title

Paper title and authors

## Motivations

### Proof of work

Has anyone heard of it?


### Hash functions

Ingrediant for proof of work and proof of sequential work

Hash maps from data structures?

Quick demo

Properties
* Output seems random
* Changing a single input bit changes the entire output

### Proof of work construction

Fix x, find y so that H(x, y) starts with n 0s.

* Hard to compute
	* Intuitively can only brute force and try every y.
* Easy to check
	* Just evaluate the function
* Application: Bitcoin mining

### Proof of sequential work: Goal

Aka time-locked puzzles

* Hard to compute
* **Cannot** be parallelized
* Still easy to check
* Candidate solution: Just build a hash chain - difficult to check though.

Applications in blockchains

## Main slide

Analyze an existing (cite?) construction in the quantum setting

The "transition capacity" framework for hash fns analysis - has independent interest

## Models

### Model: ROM

Treat hash functions as oracles.
algorithmic complexity = query complexity
Analyze by seeing the database of where queries are.
Ie. preimage

### Model: QROM

Quantum version of ROM.
Query equation...?

Database defined analogously? Nontrivial though.

TODO illustration at least?

### Database property


Framework

Everything so far is preliminary!!!!

Definition

Example

### Transition capacity

Define transition prob.
Note the parallel queries.

Seq queries

Quick exercise

### theorem

Relate transition with acc

### more properties

Local properties theorem
Bounding transition prob by local prop

More ways to break down transition probs

## Proof of sequential work: Construction

Trees!

Intuitively why this works

## Proof of seqeuential work: analysis

Follow paper...

Build a "relation" for successful database

Break into 3 terms


