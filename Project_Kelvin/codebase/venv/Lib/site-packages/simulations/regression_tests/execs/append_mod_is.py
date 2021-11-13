from tabulate import tabulate
from pprint import pprint
import pandas as pd

from cadCAD.engine import ExecutionMode, ExecutionContext, Executor
from simulations.regression_tests.experiments import append_mod_id_exp
# from simulations.regression_tests.models import config_multi_1, sweep_config
from simulations.regression_tests.models.config_multi_1 import sim_config as sim_config_a
from simulations.regression_tests.models.config_multi_1 import genesis_states as genesis_states_a
from simulations.regression_tests.models.config_multi_1 import env_processes as env_process_a
from simulations.regression_tests.models.config_multi_1 import partial_state_update_block as psubs_a
from simulations.regression_tests.models.sweep_config import sim_config as sim_config_b
from simulations.regression_tests.models.sweep_config import genesis_states as genesis_states_b
from simulations.regression_tests.models.sweep_config import env_process as env_process_b
from simulations.regression_tests.models.sweep_config import partial_state_update_blocks as psubs_b

# ['0x1', None, 3]
# [None, 'sys_model_C', 'model@3', 'model@3', 'model@3']
def append_model_id(model_ids, sim_config, genesis_states, env_process, psubs):
    for mod_id in model_ids:
        append_mod_id_exp.append_model(
            model_id=mod_id,
            sim_configs=sim_config,
            initial_state=genesis_states,
            env_processes=env_process,
            partial_state_update_blocks=psubs,
            policy_ops=[lambda a, b: a + b]
        )

append_model_id(
    model_ids=['0x1', None, '3'],
    sim_config=sim_config_a,
    genesis_states=genesis_states_a,
    env_process=env_process_a,
    psubs=psubs_a
)
append_model_id(
    model_ids=[None, 'sys_model_C', 'model@3', 'model@3', 'model@3'],
    sim_config=sim_config_b,
    genesis_states=genesis_states_b,
    env_process=env_process_b,
    psubs=psubs_b
)

print(append_mod_id_exp.model_ids)

# exec_mode = ExecutionMode()
#
# local_proc_ctx = ExecutionContext(context=exec_mode.local_mode)
# run = Executor(exec_context=local_proc_ctx, configs=append_mod_id_exp.configs)
#
# raw_result, tensor_fields, _ = run.execute()
# result = pd.DataFrame(raw_result)
# print(tabulate(tensor_fields[0], headers='keys', tablefmt='psql'))
# print(tabulate(result, headers='keys', tablefmt='psql'))

