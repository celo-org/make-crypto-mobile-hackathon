# from memory_profiler import profile
# import cProfile, re
import os
import threading
import timeit

import unittest
from pprint import pprint

import psutil

from cadCAD.configuration import Experiment
from cadCAD.engine import ExecutionMode, ExecutionContext, Executor
from testing.models import param_sweep, policy_aggregation

# class Thread_ext(threading.Thread):
#     def __init__(self, *args, **kwargs):
#         super(Thread_ext, self).__init__(*args, **kwargs)
#         self.cpu_num_accumulator = cpu_num_accumulator

cpu_count = psutil.cpu_count()
# cpu_num_accumulator =
class DisplayCPU(threading.Thread):
    def run(self):
        # self.cpu_num_accumulator = set()
        self.running = True
        pid = os.getpid()
        currentProcess = psutil.Process(pid=pid)
        self.current_cpu_num = currentProcess.cpu_num()
        # cpu_num_accumulator.add

        # self.cpu_num_accumulator.append(current_cpu_num)
        # current_cpu_count = psutil.cpu_count()
        # current_cpu_percent = psutil.cpu_percent(interval=1)
        # if self.running:
        #     print(current_cpu_num)
        # else:
        #     print(current_cpu_num)
        # while self.running:
            # print(self.cpu_num_accumulator)
            # self.cpu_num_accumulator.add(current_cpu_num)

            # self.cpu_num_accumulator.append(current_cpu_num)
            # print(len(self.cpu_num_accumulator))
            # print(current_cpu_num)
            # cpu_num_accumulator.append(current_cpu_num)
            # print(pid)
            # print()
            # print(currentProcess)
            # print(current_cpu_num)
            # print(current_cpu_count)
            # print(current_cpu_percent)

    def stop(self):
        self.running = False
        # return self.cpu_num_accumulator

exp = Experiment()
sys_model_A_id = "sys_model_A1"
exp.append_model(
    model_id=sys_model_A_id,
    sim_configs=param_sweep.sim_config,
    initial_state=param_sweep.genesis_states,
    env_processes=param_sweep.env_process,
    partial_state_update_blocks=param_sweep.partial_state_update_blocks
)
sys_model_A_id = "sys_model_A2"
exp.append_model(
    model_id=sys_model_A_id,
    sim_configs=param_sweep.sim_config,
    initial_state=param_sweep.genesis_states,
    env_processes=param_sweep.env_process,
    partial_state_update_blocks=param_sweep.partial_state_update_blocks
)
# sys_model_B_id = "sys_model_B"
# exp.append_model(
#     model_id=sys_model_B_id,
#     sim_configs=param_sweep.sim_config,
#     initial_state=param_sweep.genesis_states,
#     env_processes=param_sweep.env_process,
#     partial_state_update_blocks=param_sweep.partial_state_update_blocks
# )
# sys_model_C_id = "sys_model_C"
# exp.append_model(
#     model_id=sys_model_C_id,
#     sim_configs=policy_aggregation.sim_config,
#     initial_state=policy_aggregation.genesis_states,
#     partial_state_update_blocks=policy_aggregation.partial_state_update_block,
#     policy_ops=[lambda a, b: a + b, lambda y: y * 2] # Default: lambda a, b: a + b
# )

exp2 = Experiment()
sys_model_A_id = "sys_model_A1"
exp2.append_model(
    model_id=sys_model_A_id,
    sim_configs=param_sweep.sim_config,
    initial_state=param_sweep.genesis_states,
    env_processes=param_sweep.env_process,
    partial_state_update_blocks=param_sweep.partial_state_update_blocks
)
sys_model_A_id = "sys_model_A2"
exp2.append_model(
    model_id=sys_model_A_id,
    sim_configs=param_sweep.sim_config,
    initial_state=param_sweep.genesis_states,
    env_processes=param_sweep.env_process,
    partial_state_update_blocks=param_sweep.partial_state_update_blocks
)
sys_model_A_id = "sys_model_A3"
exp2.append_model(
    model_id=sys_model_A_id,
    sim_configs=param_sweep.sim_config,
    initial_state=param_sweep.genesis_states,
    env_processes=param_sweep.env_process,
    partial_state_update_blocks=param_sweep.partial_state_update_blocks
)
# sys_model_C_id = "sys_model_C1"
# exp2.append_model(
#     model_id=sys_model_C_id,
#     sim_configs=policy_aggregation.sim_config,
#     initial_state=policy_aggregation.genesis_states,
#     partial_state_update_blocks=policy_aggregation.partial_state_update_block,
#     policy_ops=[lambda a, b: a + b, lambda y: y * 2] # Default: lambda a, b: a + b
# )
# sys_model_C_id = "sys_model_C2"
# exp2.append_model(
#     model_id=sys_model_C_id,
#     sim_configs=policy_aggregation.sim_config,
#     initial_state=policy_aggregation.genesis_states,
#     partial_state_update_blocks=policy_aggregation.partial_state_update_block,
#     policy_ops=[lambda a, b: a + b, lambda y: y * 2] # Default: lambda a, b: a + b
# )

runs = len(exp.configs)
# print(runs)
# exit()

def hi():
    return 'hi'
exec_mode = ExecutionMode()
local_mode_ctx = ExecutionContext(context=exec_mode.multi_proc)
simulation_1 = Executor(exec_context=local_mode_ctx, configs=exp.configs)
simulation_2 = Executor(exec_context=local_mode_ctx, configs=exp2.configs)


# exit()
# cProfile.run('re.compile("simulation.execute")')

# @mem_profile
# @profile
# def profiled_exec():
#     return simulation.execute()

# raw_results, _, _ = profiled_exec()

# cpu_num_accumulator = []
# display_cpu = DisplayCPU()
# display_cpu.start()
# try:
#     result = simulation_1.execute()
# finally: # stop thread even when I press Ctrl+C
#     display_cpu.stop()

# pprint(cpu_num_accumulator)
# print()
# pid = os.getpid()
# print()
# print(pid)
# exit()
# myProcess = psutil.Process(os.getpid())
#
# print(myProcess.cpu_num())

duration_1 = timeit.Timer(simulation_1.execute).timeit(number=1)
duration_2 = timeit.Timer(simulation_2.execute).timeit(number=1)
# print(duration_1)
# print(duration_2)
#
# # print()
print(duration_2/duration_1)

# class BenchmarkTest(unittest.TestCase):
#     def test_runtime(self):
#         duration_1 = timeit.Timer(simulation_1.execute).timeit(number=1)
#         duration_2 = timeit.Timer(simulation_2.execute).timeit(number=1)
#         avg_duration = (duration_1 + duration_2) / 2
#         print(f'Runtime: {avg_duration} seconds')
#         self.assertEqual(avg_duration <= 2, True, "ValueError raised when runs (N) < 1")
#
#
# if __name__ == '__main__':
#     unittest.main()
