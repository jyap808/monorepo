Arbitrators
=============

.. toctree::
   :maxdepth: 2
   :caption: Contents:


An arbitrator is responsible for providing a final answer to a question when there is a dispute, in exchange for a fee. If the arbitrator is untrustworthy, the system cannot be relied on to provide accurate answers.

Any contract address can be set as the arbitrator. Our dapp currently lists only the Reality Keys trusted arbitrator contract, but others can be entered manually. We can add other contract addresses on request.

Since arbitration is expensive, it will usually only be requested after parties have posted bonds, and the bonds have escalated to a level where the bond you stand to gain by paying for arbitration is higher than the fee. Accordingly, arbitrators should feel free to set fairly high fees that will adequately cover the cost of a thorough arbitration process.


Arbitration Models
------------------

Trusted third-parties
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Reality.eth team have been providing a centralized arbitration service since 2013 beginning with the Reality Keys service. Use of this service is currently discouraged as decentralized alternatives are available.

Kleros
^^^^^^

Kleros provide a decentralized court system that is integrated with reality.eth and has been used successfully for high-stakes settlement.

Stakeholder voting
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Where a consumer contract has their own token, they may choose to provide their own arbitrator contract allowing their own stakeholders to vote. Alternatively, it is possible to deploy a reality.eth contract using the token in question for bonds, then create questions without a registered arbitrator. That way the side able to martial the greatest amount of the token will prevail.


Subjectivocracy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We are developing a system along the lines described in `Get the facts, hard-fork all the things`_. The `current design`_ envisages using a forkable Layer 2 ledger.

.. _`Get the facts, hard-fork all the things`: https://decentralize.today/get-the-facts-hard-fork-all-the-things-3ea2233da0fd
.. _`current design`: https://github.com/RealityETH/subjectivocracy




Creating and using an arbitration contract
------------------------------------------

Arbitrator contracts should expose the following functions to users:

* ``function getDisputeFee(bytes32 question_id) constant returns (uint256)``
* ``function requestArbitration(bytes32 question_id)``

When ``requestArbitration()`` is called with a sufficient fee, they should call the following against the Reality.eth contract:

* ``notifyOfArbitrationRequest(bytes32 question_id, address requester)``

When they produce an answer, they should settle the contract with:

* ``submitAnswerByArbitrator(bytes32 question_id, bytes32 answer, address answerer)``

If the result of arbitration is to affirm the answer given by the final answerer, the person who gave that answer should be supplied as ``answerer``. If the result of arbitration is to change the final answer, the ``answerer`` supplied should be the user who paid for arbitration.

.. note::
   Sometimes the answer the arbitrator finalizes on will already have been given earlier, but with a lower bond. It may appear fairer to some for the arbitrator to set the ``answerer`` as the person who previously gave that answer, not the person who paid. However, for all we know the person who gave the correct answer could be a sock puppet belonging to the person who gave the final, wrong answer. Rewarding them would remove the disincentive to lie. For the system the incentive system to work correctly, it is essential that the arbitrator choose the person who paid them as the ``answerer``, unless the pre-existing final answer was correct.


Getting information about the arbitrator
----------------------------------------

* ``function realitio()`` should provide the address of the Reality.eth contract to which the arbitrator responds.
* ``function metadata()`` should provide a string of json-encoded metadata. The following properties are scheduled for implementation in the Reality.eth dapp:

  * ``tos``: A URI representing the location of a terms-of-service document for the arbitrator.
  * ``template_hashes``: An array of hashes of templates supported by the arbitrator. If you have a numerical ID for a template registered with Reality.eth, you can look up this hash by calling the Reality.eth ``template_hashes()`` function.

